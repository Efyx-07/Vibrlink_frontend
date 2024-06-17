import Navigation from './Navigation';
import './MobileMenu.scss';

interface MobileMenuProps {
    isOpen: boolean;
    closeMenu: () => void;
}

export default function MobileMenu({isOpen, closeMenu}: MobileMenuProps) {

    return (
        <div className={`mobile-menu ${!isOpen ? "hidden-menu" : ""}`}>
            {/* "onItemClick" prop to close the mobile menu when an navItem is clicked */}
            <Navigation onItemClick={closeMenu}/> 
        </div>
    )
}