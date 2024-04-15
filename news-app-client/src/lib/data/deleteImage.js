import { firebaseStorage } from "../../firebase";
import { ref,deleteObject } from "firebase/storage";

// Function to delete image
const deleteImage = async (userId) => {
    try {
        const userImagesRef = ref(firebaseStorage, `user-images/${userId}`);
        const imageList = await listAll(userImagesRef);

        // Delete each image in the list
        await Promise.all(imageList.items.map(async (imageRef) => {
            await deleteObject(imageRef);
        }));

        console.log("Existing user image(s) deleted successfully");
    } catch (error) {
        console.error("Error deleting existing user image: ", error);
        throw error;
    }
};

export default deleteImage;