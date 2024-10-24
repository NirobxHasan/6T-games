import axios from 'axios';
const bodyFormData = new FormData();
const dataFetcher = async (method: string, url: string, formdata?: any) => {
    if (formdata) {
        Object.keys(formdata).map((key: string) =>
            bodyFormData.append(key, formdata[key as keyof typeof formdata])
        );
    }
    const { data, status } = await axios({
        method: method,
        url: `${process.env.REACT_APP_API}${url}`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return { data, status };
};

export default dataFetcher;
