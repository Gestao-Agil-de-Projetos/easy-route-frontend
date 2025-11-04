import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Edit2 } from 'lucide-react';
import { colors } from '../../../conf/theme';
import RouteAvatar from '../../atoms/RouteAvatar';
import RouteButton from '../../atoms/RouteButton';
import RouteText from '../../atoms/RouteText';

const ProfileHeroBanner = ({
  name,
  role,
  avatar,
  initials,
  isMobile,
  onAvatarChange,
  onAvatarSave,
  onAvatarCancel,
  isEditing,
  showSaveButtons,
}) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target.result);
      reader.readAsDataURL(file);
      onAvatarChange?.(file);
    }
  };

  const handleSave = () => {
    onAvatarSave?.(avatarPreview);
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleCancel = () => {
    onAvatarCancel?.();
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary[700]} 100%)`,
        p: 0,
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'visible',
        minHeight: { xs: 120, sm: 160, md: 180 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="avatar-upload" style={{ cursor: 'pointer', display: 'block' }}>
          <Box sx={{ position: 'relative', width: isMobile ? 88 : 120, height: isMobile ? 88 : 120, mx: 'auto' }}>
            <RouteAvatar
              initials={initials}
              size={isMobile ? 88 : 120}
              bgColor={colors.primary[100]}
              color={colors.primary[800]}
              src={avatarPreview || avatar || undefined}
              sx={{
                boxShadow: 4,
                border: `4px solid white`,
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                transition: 'filter 0.2s',
                filter: avatarFile ? 'brightness(0.95)' : 'none',
              }}
            />
          </Box>
        </label>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <RouteButton
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<Edit2 size={16} />}
            component="label"
            sx={{ borderRadius: 5, px: 2 }}
            htmlFor="avatar-upload"
          >
            Editar foto
          </RouteButton>
        </Box>
        {showSaveButtons && avatarFile && isEditing && (
          <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <RouteButton size="small" color="primary" variant="contained" onClick={handleSave}>
              Salvar
            </RouteButton>
            <RouteButton size="small" color="primary" variant="outlined" onClick={handleCancel}>
              Cancelar
            </RouteButton>
          </Box>
        )}
      </Box>

      <Box>
        <RouteText
          text={name}
          sx={{ fontSize: { xs: '20px', sm: '24px', md: '28px' }, fontWeight: 700, color: 'white', mb: 0.5 }}
        />
        <RouteText
          text={role}
          sx={{ fontSize: { xs: '12px', sm: '14px' }, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}
        />
      </Box>
    </Box>
  );
};

export default ProfileHeroBanner;
