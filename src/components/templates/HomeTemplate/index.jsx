import { Box } from '@mui/material';
import Header from '../../organisms/Header';

const HomeTemplate = ({ children, onLogoClick }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Header onLogoClick={onLogoClick} />
      <Box
        sx={{
          width: '100%',
          flex: 1,
          padding: { xs: '16px', sm: '24px', md: '32px' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HomeTemplate;
