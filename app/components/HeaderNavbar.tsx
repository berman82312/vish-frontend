import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { NavigationDrawer } from "./NavigationDrawer";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

export default function HeaderNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    function handleClose() {
        setIsOpen(false);
    }
    return (
        <>
            <Navbar fluid border>
                <NavbarBrand className="w-full flex justify-center">
                    <Button
                        outline
                        className="px-2 absolute left-4"
                        onClick={() => setIsOpen(true)}
                    >
                        <HiMenu className="h-6 w-6" />
                    </Button>
                    <span className="ml-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Vish
                    </span>
                </NavbarBrand>
            </Navbar>
            <NavigationDrawer
                open={isOpen}
                onClose={handleClose}
            />
        </>
    );
}
