import { useState } from "react";
import { useUserStore } from "@/stores";
import HoverUserMenu from './HoverUserMenu';
import './MyAccountItem.scss';

export default function MyAccountItem() {

    // get the login status of the user to display or not the item
    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

    // state for HoverUserMenu
    const [isHoverUserMenuVisible, setIsHoverUserMenuVisible] = useState<boolean>(false);
    
    const handleEmailMouseEnter = (): void => {
        setIsHoverUserMenuVisible(true);
    };

    const handleEmailMouseLeave = (): void => {
        setIsHoverUserMenuVisible(false);
    };

    return (
        <div className="myAccountItem-container">
            {isLogged && (
                <div
                    className="myAccountItem"
                    onMouseEnter={handleEmailMouseEnter}
                    onMouseLeave={handleEmailMouseLeave}
                >
                    <p>My Account</p>
                    {isHoverUserMenuVisible && (<HoverUserMenu />)}
                </div>
            )}  
        </div>
    )
}