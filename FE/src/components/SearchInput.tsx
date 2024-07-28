import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const SearchInput = () => {
    return (
        <div className="relative flex">
            <Search className="w-4 h-4 absolute top-3 left-3 text-slate-600" />
            <Input
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Tìm kiếm "
            />
            <Button
                onClick={() => {
                    toast({
                        title: "Tìm kiếm",
                        description: "Đã tìm kiếm",
                        variant: "success",
                    })
                }}
                className="rounded-[2rem] bg-[#f1f5f9] hover:bg-[#ccc] text-black ml-1 outline-1">✅</Button>
        </div>
    );
};

export default SearchInput;
