import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from "@mui/material/Link";
import { lightTheme, darkTheme } from './theming'
import profile_picture from '../other_images/profile.jpg'

const internal_pages = [
    {
        "name": "Home",
        "link": "/",
    },
    {
        "name": "About",
        "link": "/about",
    },
    {
        "name": "My Work",
        "link": "/work",
    },
    {
        "name": "Personal Projects",
        "link": "/projects",
    },
];
const external_pages = [
    {
        "name": "LinkedIn",
        "link": "https://www.linkedin.com/in/charleszawacki/",
    },
    {
        "name": "GitHub",
        "link": "https://github.com/cazwacki",
    },
    {
        "name": "Google Play",
        "link": "https://play.google.com/store/apps/developer?id=Charles+Z.",
    },
    {
        "name": "itch.io",
        "link": "https://itch.io/profile/czawacki",
    },
];

const Header = (props) => {

    const [prevScrollPos, setPrevScrollPos] = React.useState(0);
    const [visible, setVisible] = React.useState(true);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const setLightTheme = () => {
        props.setTheme(lightTheme)
        document.documentElement.classList.remove('dark')
        localStorage.setItem("czawacki_theme", "light");
    }

    const setDarkTheme = () => {
        props.setTheme(darkTheme)
        document.documentElement.classList.add('dark')
        localStorage.setItem("czawacki_theme", "dark");
    }

    const toggleTheme = () => {
        if (document.documentElement.classList.contains('dark')) {
            setLightTheme();
        } else {
            setDarkTheme();
        }
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos - currentScrollPos > 0 || currentScrollPos < 200);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible]);


    return (
        <div>
            <AppBar position="fixed" sx={{ top: visible ? '0' : '-100px', transition: 'background-color 250ms ease-in-out' }} color="primary" enableColorOnDark>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            color="secondary"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Charles Zawacki
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="profile button"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {internal_pages.map((page) => (
                                    <Link key={page.name + page.link} component={RouterLink} to={page.link} underline="none" color="inherit">
                                        <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page.name}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                                <Box textAlign='center'>
                                    <Button variant="contained" onClick={toggleTheme} startIcon={<Link />}>Toggle Theme</Button>
                                </Box>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            Charles Zawacki
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {internal_pages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={RouterLink}
                                    to={page.link}
                                    onClick={handleCloseNavMenu}
                                    sx={{ m: 2, display: 'block' }}
                                    color='secondary'
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end" }}>
                            <Button sx={{ m: 2 }} color='secondary' onClick={toggleTheme} startIcon={<Link />}>Toggle Theme</Button>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Social Links">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Charles Zawacki" src={profile_picture} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {external_pages.map((external_page) => (
                                    <Link key={external_page.name + external_page.link} href={external_page.link} target="_blank" underline="none" color="inherit">
                                        <MenuItem key={external_page.name} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{external_page.name}</Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div >
    );
};
export default Header;