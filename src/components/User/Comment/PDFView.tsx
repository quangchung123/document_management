import {Viewer, Worker} from "@react-pdf-viewer/core";
import {useSelector} from 'react-redux';

const PDFView = () => {
    // const fileUrl = useSelector((state:any) => state.urlFile.fileUrl);
    // console.log("fileUrl", fileUrl);
    return (
        <div className='pdf-container'>
            <Worker workerUrl='"https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"' >
                <div
                    style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        height: '750px',
                    }}
                >
                    <Viewer fileUrl="blob:http://localhost:3000/bb02afaa-3778-40ea-8e28-53915b0eeb43" />
                </div>
            </Worker>
        </div>
    )
}
export default PDFView;
