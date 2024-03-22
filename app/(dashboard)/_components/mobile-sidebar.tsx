import { Menu } from "lucide-react";
// estaba importante sidebar de lucide react, por eso no renderizaba en mobile.
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MobileSidebar = () => {
    return(
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
} 