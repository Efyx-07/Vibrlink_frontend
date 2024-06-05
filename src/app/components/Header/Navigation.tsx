import Link from "next/link";
import { useUserStore } from "@/stores";
import { useEffect } from "react";
import './Navigation.scss';

// local component form a navItem
interface NavItemProps {
    name: string,
    navTo: string
};

function NavItem({name, navTo, onItemClick}: NavItemProps & NavigationProps) {

    const handleClick = (): void => {
        onItemClick();
    }

    return (
        <Link className="navItem" href={navTo} onClick={handleClick}>
            <p>{name}</p>
        </Link>
    )
};

// Navigation component
interface NavigationProps {
    onItemClick: () => void; // prop to close the mobile menu when an navItem is clicked
}

export default function Navigation({onItemClick}: NavigationProps) {

    // get the login status of the user to display the wanted navitems
    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

    useEffect(() => {
    }, [isLogged]);

    const loggedOutNavItems: NavItemProps[] = [
        { name: 'Create a free account', navTo: '/signup'},
        { name: 'Sign in', navTo: '/login'}
    ];

    const loggedInNavItems: NavItemProps[] = [
        { name: 'New vibrlink', navTo: '/new-vibrlink' },
        { name: 'My vibrlinks', navTo: '/my-links' }
    ];

    return (
        <div className="navItems-container">
            {isLogged ? 
                (
                    loggedInNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} onItemClick={onItemClick}/>
                    ))
                ) 
                : 
                (
                    loggedOutNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} onItemClick={onItemClick}/>
                    ))

                ) 
            }
        </div>
    )
}; 