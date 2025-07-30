"use client";
import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "@/app/context/globalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { logout } from "@/app/utils/Icons";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";


function Sidebar() {

  const  {theme}  = useGlobalContext();

  const router = useRouter();
  const pathname = usePathname();

  const {signOut} = useClerk()

  const {user} = useUser();

  console.log(user)

  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };

  const handleClick = (link:string)=>{
    router.push(link);
  }

if (!theme) {
    return <div>Loading...</div>;
}

    return <Sidebarstyled theme={theme}>
        <div className="profile">
            <div className="profile-overlay"></div>
                <div className="image">
                    <Image src={imageUrl} alt="profile" width={70} height={70} />
                </div>
                <div className="user-btn absolute z-20 top-0 w-full h-full">
                    <UserButton/>
                </div>
                <h1>
                    <span>{firstName}</span>
                    <span>{lastName}</span>
                </h1>
        </div>
        <ul className="nav-items">
            {menu.map((item) => {
                const link = item.link;
                return (<li key={item.id} className={`nav-item ${pathname === link ? "active" : ""}`} onClick={()=>handleClick(item.link)}>
                        {item.icon}
                    <Link href={link}>
                        <span>{item.title}</span>
                    </Link>
                </li>)
            })}
        </ul>
        <div className="sign-out relative m-6">
        <Button
          name={"Sign Out"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          click={() => {
            signOut(() => router.push("/signin"));
          }}
        />
      </div>
    </Sidebarstyled>;
};

const Sidebarstyled = styled.nav`
    position: relative;
    width: ${(props) => props.theme.sidebarWidth};
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${(props) => props.theme.colorGrey3};


    .user-btn{
        .cl-rootBox{
            height:100%;
            width:100%;
            .cl-userButtonTrigger{
                height:100%;
                width:100%;
                .cl-userButtonBox{
                    height:100%;
                    width:100%;
                    opacity: 0;
                }
            }
        }
    }

    .profile{
        margin: 1.5rem;
        padding: 1rem 0.8rem;
        position: relative;

        border-radius: 1rem;
        cursor: pointer;

        font-weight: 500;
        color: ${(props) => props.theme.colorGrey0};
        
        display: flex;
        align-items: center;
        
        .profile-overlay{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(10px);
            z-index: 0;
            background-color: ${(props) => props.theme.colorBg3};
            transition: all 0.55s linear;
            border-radius: 1rem;

            opacity: 0.2;
        }

        h1{
            font-size: 1.2rem;
            display: flex;
            flex-direction: column;
            line-height: 0.9;
        }

        .image, h1{
            position: relative;
            z-index: 1;
        }

        .image{
            flex-shrink: 0;
            display: inline-block;
            overflow: hidden;
            transition: all 0.55s ease;
            border-radius: 100%;
            height: 70px;
            width: 70px;

            img{
                border-radius: 100%;
                transition: all 0.55s ease;
            }
        }

        > h1 {
            margin-left: 1rem;
            font-size: clamp(1.2rem, 4vw, 1.4rem);
            line-height: 100%;
        }

        &:hover{
            .profile-overlay{
                opacity: 1;
                border: 2px solid ${(props) => props.theme.borderColor2};

            }

            img{
                transform: scale(1.1);
            }

        }
    }

    

    .nav-item{
        padding: 0.6rem 1rem 1rem 2.1rem;
        margin: 0.3rem 0;
        position: relative;
        cursor: pointer;
        display:grid;
        grid-template-columns: 40px 1fr;
        align-items: center;
        
        &::after{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background-color: ${(props) => props.theme.activeNavLinkHover};
            z-index: 1;
            transition: all 0.3s ease-in-out;
        }

        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background-color: ${(props) => props.theme.colorGreenDark};
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
        }

        a{
            font-weight: 500;
        }

        &:hover{
            &::after{
                width: 100%;
            }
        }
    }

    .active{
        background-color: ${(props) => props.theme.activeNavLink};


        i,a{
            color: ${(props) => props.theme.colorIcons2};
        }
    }

    .active::before{
        width: 0.3rem;
    }
}
`
export default Sidebar;