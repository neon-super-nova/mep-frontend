import axios from "axios";

async function handleLikeRecipe(recipe, setLikedStatus) {
  if (!recipe) {
    console.warn("No recipe provided to handleLikeRecipe");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found in localStorage");
    return;
  }

  const recipeId = recipe._id;
  console.log("recipe._id:", recipeId);
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(
      `/api/recipes/${recipeId}/like`,
      {},
      { headers }
    );
    console.log("response was " + response.data.status);
    const like = response.data.status === "liked" ? true : false;
    setLikedStatus(like);
  } catch (err) {
    console.error("Error liking recipe:", err);
  }
  // } else {
  //   try {
  //     const response = await axios.post(
  //       `/api/recipes/${recipeId}/unlike`,
  //       {},
  //       { headers }
  //     );
  //     console.log(response.data);
  //     setLikedRecipes(likedRecipes.filter((r) => r._id !== recipe._id));
  //   } catch (err) {
  //     console.error("Error unliking recipe:", err);
  //   }
}

export default handleLikeRecipe;
