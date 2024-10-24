import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLegalInfo } from '../../../services/httpRequest';
const LegalInfo = () => {
    const { keyword } = useParams();
    const [data, setData] = useState<any>({});

    useEffect(() => {
        if (keyword) {
            const formData = {
                keyword: keyword
            };
            getLegalInfo(formData).then((res) => {
                if (res?.data.status.responseCode === '1') {
                    setData(res?.data.data);
                    // console.log(res?.data);
                }
            });
        }
    }, [keyword]);

    return (
        <div className="max-w-screen-xl  mx-auto mt-10  md:px-5 px-2">
            <h1 className="text-2xl md:text-5xl font-black racking-widest uppercase">
                <span className="text-red-500 ">{data?.title}</span>
            </h1>
            <div className="mt-6 text-base leading-8 p-2 ">
                <div dangerouslySetInnerHTML={{ __html: data?.details }}></div>
            </div>
        </div>
    );
};

export default LegalInfo;

interface LegalInfoState {
    title: string;
    details: string;
}
