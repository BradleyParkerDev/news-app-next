import { firebaseStorage } from "../../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const getImages  = async (id) =>{
    try {
        const userImagesRef = ref(firebaseStorage, `user-images/${id}`);
        const result = await listAll(userImagesRef);

        // Array to store download URLs of all photos
        const photoUrls = [];

        // Iterate through each item (photo) in the folder
        for (const item of result.items) {
            // Get download URL for each photo
            const imageUrl = await getDownloadURL(item);
            photoUrls.push(imageUrl);
        }

        return photoUrls;
    } catch (error) {
        console.error("Error getting user photos: ", error);
        throw error;
    }

}

export default getImages;