import { Box, Button, styled, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {useContext} from 'react';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { CustomThemeContext } from "app/store/customThemeContext";
import Link from "app/components/navigation/Link";
import { useRouter } from 'next/router';

const StyledNavChildBox = styled(Box)`
    width: 100%;
    display: flex;
    align-items: center;

    &.active {
        svg, p {
            color: #fff;
            fill: #fff;
        }
    }
`

const StyledLink = styled(Link)`
    padding: 10px 25px !important;
`

interface NavProps {
    item: {
        title: string;
        children: {
            title: string;
            icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
                muiName: string;
            };
            href: string;
            disabled: boolean;
        }[];
    },
    index: number
}

const NavItems = ({item, index}: NavProps) => {
    const { theme } = useContext(CustomThemeContext);

    const router = useRouter();

    return (
        <>
        {
            item.children.map((child, childIndex) => {
                let isActive = router.pathname.includes(child.href);
                return (
                    <Button id={child.href} disabled={child.disabled} variant={(isActive)?"contained":(child.disabled)?"contained":"text"} sx={{ boxShadow: isActive?"0 2px 4px rgba(0,0,0,0.5)":null, mb: "2px" }}  LinkComponent={StyledLink} href={child.href} key={"childItem_"+index.toString()+"_"+childIndex.toString()}>
                        <StyledNavChildBox className={isActive?"active":undefined}>
                            <child.icon sx={{ fontSize: "24px", fill: theme.palette.text.secondary, mr: "16px" }} />
                            <Typography sx={{ fontSize: "14px", lineHeight: "20px" }}>
                                {child.title}
                            </Typography>
                            <ChevronRightRoundedIcon sx={{ ml: "auto", float: "right", fontSize: "24px", lineHeight: "20px", color: "text.secondary" }}  />
                        </StyledNavChildBox>
                    </Button>
                )
            })
        }
        </>
    )
}

export default NavItems;