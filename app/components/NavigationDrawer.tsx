"use client";

import {
    Drawer,
    DrawerHeader,
    DrawerItems,
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
} from "flowbite-react";
import {
    HiChartPie,
    HiClipboard,
    HiCollection,
    HiShoppingBag,
    HiUsers,
} from "react-icons/hi";

type NavigationDrawerProps = {
    open: boolean;
    onClose: () => void;
}

export function NavigationDrawer(props: NavigationDrawerProps) {
    return (
        <Drawer open={props.open} onClose={props.onClose}>
            <DrawerHeader title="MENU" titleIcon={() => <></>} />
            <DrawerItems>
                <Sidebar
                    aria-label="Sidebar with multi-level dropdown example"
                    className="[&>div]:bg-transparent [&>div]:p-0"
                >
                    <div className="flex h-full flex-col justify-between py-2">
                        <div>
                            <SidebarItems>
                                <SidebarItemGroup>
                                    <SidebarItem href="/business-models" icon={HiChartPie}>
                                        Business Models
                                    </SidebarItem>
                                    <SidebarItem href="/service-categories" icon={HiShoppingBag}>
                                        Service Categories
                                    </SidebarItem>
                                    <SidebarItem href="/service-areas" icon={HiUsers}>
                                        Service Areas
                                    </SidebarItem>
                                    <SidebarItem href="/rate-cards" icon={HiClipboard}>
                                        Rate cards
                                    </SidebarItem>
                                    <SidebarItem href="/marketplace" icon={HiCollection}>
                                        Marketplace
                                    </SidebarItem>
                                </SidebarItemGroup>
                            </SidebarItems>
                        </div>
                    </div>
                </Sidebar>
            </DrawerItems>
        </Drawer>
    );
}
