import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      // find the other user in the chat
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      if (!receiverId) {
        // safety: if no receiver found, skip attaching
        chat.receiver = null;
        continue;
      }

      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log("Error in getChats:", err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    await prisma.chat.update({
      where: { id: req.params.id },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log("Error in getChat:", err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  const { receiverId } = req.body; // ✅ fixed spelling
  try {
    if (!receiverId) {
      return res
        .status(400)
        .json({ message: "receiverId is required to create chat" });
    }

    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, receiverId], // ✅ no undefined now
      },
    });

    res.status(200).json(newChat);
  } catch (err) {
    console.log("Error in addChat:", err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          push: [tokenUserId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log("Error in readChat:", err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
