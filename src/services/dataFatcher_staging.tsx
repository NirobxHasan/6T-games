import axios from 'axios';
const bodyFormData = new FormData();
const dataFatcher_staging = async (
    method: string,
    url: string,
    formdata?: any
) => {
    if (formdata) {
        Object.keys(formdata).map((key: string) =>
            bodyFormData.append(key, formdata[key as keyof typeof formdata])
        );
    }
    const { data, status } = await axios({
        method: method,
        url: `http://api-6tgames.mygamezone.xyz/${url}`,
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return { data, status };
};

export default dataFatcher_staging;
