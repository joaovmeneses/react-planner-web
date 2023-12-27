import LogoHF from '../../components/register/logoHFscreen';
import RegTB from '@/components/register/RegisterTB';

export default function Page(){
    return (
        <div className='flex flex-row'>
            <LogoHF />
            <div className='bg-white w-1/2 h-screen'></div>
        </div>
    );
}