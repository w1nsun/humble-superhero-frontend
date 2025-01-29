import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function PageHeader() {
    return (
        <nav className="flex py-[1rem] px[15px] gap-10 lg:gap-10 items-center justify-between fixed top-0 left-0 z-index-100 h-[70px] w-full bg-white">
            <div className="flex gap-4 items-center flex-shrink-0 pl-4">
                <Link to="/" className="flex items-center">
                    <h1 className=" text-slate-900 h-full font-extrabold text-2xl">
                        SH
                    </h1>
                </Link>
            </div>
            <div className="flex"></div>
            <div className="flex items-center pr-4">
                <Button size="sm" href="/create">
                    Create Superhero
                </Button>
            </div>
        </nav>
    );
}
