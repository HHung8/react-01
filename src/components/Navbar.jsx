import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import { useStateContext } from "../contexts/ContextProvider";
import Cart from "./Cart";
import Chat from "./Chat";
import Notification from "./Notification";
import UserProfile from "./UserProfile";
import { useEffect } from "react";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();

  // useEffect, Đây là một hook không có dependencies (mảng phụ thuộc rỗng, vì vậy nó chỉ chạy 1 lần sau khi component được render lần đầu tiên)
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth); // Khai báo một hàm handleResize, hàm này cập nhật state screenSize với giá trị chiều rộng hiện tại của cửa sổ trình duyệt (window.innerWidth).
    window.addEventListener("resize", handleResize); // Thêm một sự kiện listener cho sự kiện resize của cửa sổ trình duyệt. Mỗi khi cửa sổ thay đổi kích thước, hàm handleResize sẽ được gọi.
    return () => window.removeEventListener("resize", handleResize); // Hàm này sẽ được gọi khi component bị unmount hoặc trước khi hiệu ứng chạy lại (Nếu dependencies thay đổi), nó sẽ gỡ bỏ sự kiện resize để tránh rỏ rỉ bộ nhớ
  }, []);

  // Nếu screenSize nhỏ hơn hoặc bằng 900 gọi hàm setActiveMenu(false); để đặt trạng thái activemenu thành false tức là ẩn menu
  // ếu screenSize lớn hơn 900, gọi hàm setActiveMenu(true) để đặt trạng thái activeMenu thành true, tức là hiển thị menu.
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]); // dependencies là screenSize, vì vậy nó sẽ chạy lại mỗi khi giá trị của screeSize thay đổi

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="メニュー"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chart"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notifications"
          dotColor="#03C9D7"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img className="rounded-full w-8 h-8" src={avatar} />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>
              <span className="text-gray-400 font-bold ml-1 text-14">
                MiChael
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.chat && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
