import multer from "multer";
const upload = multer({storage: multer.diskStorage({})})
export default upload;

// import multer from "multer";

// // Define disk storage (optional to customize destination/filename)
// const storage = multer.diskStorage({});

// const upload = multer({ storage });

// export default upload;
