import { Box, styled, Typography } from "@mui/material";
import { Navigation } from '../../../constants/navigation';
import useTranslation from '../../../utility/useTranslation';
import { NavigationStrings } from '../../../lang/common/constants/navigation';
import NavItems from './navItems';

interface NavProps {

}

const StyledNavChildrenContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;

`

const Nav = ({}: NavProps) => {
    const { t } = useTranslation(NavigationStrings);

    const navDisplay = Navigation.map((item, index) => {
        return (
            <Box key={"navItem_"+index}>
                <Typography sx={{ fontWeight: "regular", textTransform: "uppercase", fontSize: "12px", lineHeight: "20px", textIndent: "25px", pb: "14px" }}></Typography>
                <StyledNavChildrenContainer>
                    <NavItems item={item} index={index} />
                </StyledNavChildrenContainer>
            </Box>
        );
    })

    return(
        <Box>
            {navDisplay}
        </Box>
    )
}

export default Nav;