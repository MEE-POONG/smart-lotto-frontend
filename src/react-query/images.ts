import { useMutation } from "@tanstack/react-query";

import { uploadImage } from "@/services/imageService";

const useUploadImage = () => {
    return useMutation({
        mutationKey: ['uploadImage'],
        mutationFn: uploadImage,
    });
};

export default useUploadImage;