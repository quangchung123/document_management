import React from 'react';
import Skeleton from "react-loading-skeleton";
import ModalImage from "react-modal-image";

const ImagePlacerHolder = ({value = "", defaultValue = "", ...props}) => {
    return (
        <React.Fragment>
            {value === 'loading' && <Skeleton height={"100%"} {...props} />}
            {value !== 'loading' &&
                <ModalImage
                    small={!value ? defaultValue : value}
                    large={!value ? defaultValue : value}
                    className={"h-40"}
                    alt=""
                />
                // <img src={!value ? defaultValue : value} alt="value" {...props}/>
            }
        </React.Fragment>
    );
};

export default ImagePlacerHolder;
