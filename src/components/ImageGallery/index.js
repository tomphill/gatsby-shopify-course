import React from 'react';
import Image from 'gatsby-image';
import { ImageGalleryWrapper } from './styles';
import ImageThumbnail from './ImageThumbnail';

export function ImageGallery({ selectedVariantImageId, images }) {
  const [activeImageThumbnail, setActiveImageThumbnail] = React.useState(
    images.find(({ id }) => id === selectedVariantImageId) || images[0]
  );

  React.useEffect(() => {
    setActiveImageThumbnail(
      images.find(({ id }) => id === selectedVariantImageId) || images[0]
    );
  }, [selectedVariantImageId, images, setActiveImageThumbnail]);

  const handleClick = image => {
    setActiveImageThumbnail(image);
  };

  return (
    <ImageGalleryWrapper>
      <div>
        <Image fluid={activeImageThumbnail.localFile.childImageSharp.fluid} />
      </div>
      <div>
        {images.map(image => {
          return (
            <ImageThumbnail
              key={image.id}
              isActive={activeImageThumbnail.id === image.id}
              onClick={handleClick}
              image={image}
            />
          );
        })}
      </div>
    </ImageGalleryWrapper>
  );
}
