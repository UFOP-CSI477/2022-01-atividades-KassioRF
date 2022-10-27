import { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ImageUploading, { ImageListType } from "react-images-uploading";


interface UploadImgProps {
  images: any[];
  setImages: React.Dispatch<React.SetStateAction<any>>;
}

export function UploadImg(props: UploadImgProps) {
  //const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    props.setImages(imageList as never[]);
  };

  return (
    <ImageUploading
      value={props.images}
      onChange={onChange}
      maxNumber={maxNumber}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps
      }) => (
        // write your building UI
        
        <div className="upload__image-wrapper uploadImgInput row justify-center">
          
          {imageList.map((image, index) => (
            <div key={index} className="image-item col-6">
              <img src={image.dataURL} alt="" width="180" />
            </div>
          ))}
          
          <div className="col-6">            
            <Button
              variant="link"
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Inserir Imagem
            </Button>
            <Button variant="link" onClick={() => props.images.length > 0 ? onImageRemove(0) : null}>
              Remover
            </Button>          
          </div>          


        </div>
      )}
    </ImageUploading>

  );
}
