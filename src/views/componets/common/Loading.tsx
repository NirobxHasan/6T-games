import { PongSpinner } from 'react-spinners-kit';

type Props = {};

function Loading({}: Props) {
    return (
        <div className="min-h-[85vh] flex justify-center items-center">
            <PongSpinner size={100} color="#f32a41" />
        </div>
    );
}

export default Loading;
