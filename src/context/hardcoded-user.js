import savedRecipes from './savedRecipes.json'; 
import submittedRecipes from './submittedRecipes.json';

const hardcodedUser = {
  _id: "1234567890abcdef",
  username: "JDoe1129",
  firstName: "Jane",
  lastName: "Doe",
  email: "testuser@example.com",
  signupDate: "2023-01-01T00:00:00Z",
  pictureUrl: "",
  userSubmittedRecipes: [...submittedRecipes],
  userSavedRecipes: [...savedRecipes],
};

export default hardcodedUser;
