import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#4CAF50',
});

const CustomLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  marginRight: '20px',
  fontSize: '16px',
  fontWeight: 'bold',
});

const CustomInputBase = styled(InputBase)({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderRadius: '4px',
  padding: '8px',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
});

const CustomButton = styled(Button)({
  color: 'white',
  marginLeft: '10px',
  backgroundColor: '#4CAF50',
  '&:hover': {
    backgroundColor: '#45a049',
  },
});

const IconWrapper = styled('span')({
  marginRight: '5px',
});

const Navigation = ({ onSearch, cartItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <CustomAppBar position="static">
      <Toolbar>
        <CustomLink to="/">
          <IconWrapper>
            <HomeIcon />
          </IconWrapper>
          Home
        </CustomLink>

        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <CustomLink to="/cart" style={{ marginRight: '10px' }}>
            <ShoppingCartIcon />
            ({cartItems.length})
          </CustomLink>
          <CustomLink to="/order">
            <IconWrapper>
              <ListAltIcon />
            </IconWrapper>
            Order
          </CustomLink>
        </div>
        <CustomInputBase
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startAdornment={<SearchIcon />}
          style={{ marginLeft: '10px' }}
        />
        <CustomButton variant="outlined" onClick={handleSearch} style={{ marginLeft: '10px', border: "1px solid white" }}>
          Search
        </CustomButton>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Navigation;
