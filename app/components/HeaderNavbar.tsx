import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";

export default function HeaderNavbar() {
    return (
        <Navbar fluid rounded>
            <NavbarBrand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Vish
                </span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink href="/business-models">
                    Business Models
                </NavbarLink>
                <NavbarLink href="/service-categories">
                    Service Categories
                </NavbarLink>
                <NavbarLink href="/service-areas">
                    Service Areas
                </NavbarLink>
                <NavbarLink href="/rate-cards">
                    Rate cards
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}
