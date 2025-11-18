import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";
// Import local (ignored) config. Developer must create lib/appwriteConfig.js from sample.
// Falls back to the tracked sample if the real file is missing.
// This prevents committing real IDs/keys.
let awConfig;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  awConfig = require("./appwriteConfig").awConfig; // non-transpiled CommonJS fallback
} catch (e) {
  awConfig = require("./appwriteConfig.sample").awConfig;
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = awConfig;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(awConfig.endpoint) // Your Appwrite Endpoint
  .setProject(awConfig.projectId) // Your project ID
  .setPlatform(awConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async ({ email, password, username }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Problem creating account");

    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      awConfig.databaseId,
      awConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("error in signup: ", error);
    return error;
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentLoggedInUser = await account.get();

    if (!currentLoggedInUser) throw Error;

    const currentUser = await databases.listDocuments(
      awConfig.databaseId,
      awConfig.userCollectionId,
      [Query.equal("accountId", currentLoggedInUser.$id)]
    );

    if (!currentUser) throw Error;

    console.log(currentUser.documents[0]);
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllPosts = async () => {
  try {
    allPosts = await databases.listDocuments(databaseId, videoCollectionId);
    return allPosts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    allPosts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    return allPosts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
