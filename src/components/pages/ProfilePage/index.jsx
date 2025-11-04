import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, Stack, useTheme, useMediaQuery } from '@mui/material';
import { User } from 'lucide-react';
import { colors } from '../../../conf/theme';
import Header from '../../organisms/Header';
import RouteSnackBar from '../../atoms/RouteSnackBar';
import StatCard from '../../molecules/StatCard';
import ProfileHeroBanner from '../../molecules/ProfileHeroBanner';
import ProfileEditForm from '../../molecules/ProfileEditForm';
import ChangePasswordDialog from '../../molecules/ChangePasswordDialog';
import SecuritySection from '../../molecules/SecuritySection';
import PreferencesSection from '../../molecules/PreferencesSection';
import AccountSection from '../../molecules/AccountSection';
import { AuthContext } from '../../../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { token } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const [profileData, setProfileData] = useState({
    name: 'João Silva',
    email: 'joao.silva@easyroute.com',
    phone: '(85) 98888-7777',
    role: 'PASSENGER',
    trips: 24,
    rating: 4.8,
    joinDate: new Date(2023, 0, 15),
    avatar: null,
  });

  const [editData, setEditData] = useState({ name: profileData.name, phone: profileData.phone });
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    profilePublic: true,
  });

  const passwordButtonRef = useRef(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setProfileData((prev) => ({ ...prev, role: decoded.role || 'PASSENGER' }));
      } catch (error) {
        //silenciosamente falha se houver erro
      }
    }
  }, [token]);

  const roleLabel = { PASSENGER: 'Passageiro', OWNER: 'Motorista', ADMIN: 'Administrador' }[profileData.role] || 'Usuário';
  const userInitials = profileData.name.split(' ').map((n) => n[0]).join('').toUpperCase();
  const memberDays = Math.floor((new Date() - profileData.joinDate) / (1000 * 60 * 60 * 24));

  const handleEditToggle = () => {
    setEditData({ name: profileData.name, phone: profileData.phone });
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    if (!editData.name.trim()) {
      setSnack({ open: true, message: 'Nome não pode estar vazio!', severity: 'error' });
      return;
    }
    setProfileData({ ...profileData, name: editData.name, phone: editData.phone });
    setSnack({ open: true, message: 'Perfil atualizado com sucesso!', severity: 'success' });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      setSnack({ open: true, message: 'Preencha todos os campos!', severity: 'error' });
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      setSnack({ open: true, message: 'As senhas não conferem!', severity: 'error' });
      return;
    }
    setSnack({ open: true, message: 'Senha alterada com sucesso!', severity: 'success' });
    setPasswordData({ current: '', new: '', confirm: '' });
    setShowPasswordDialog(false);
  };

  const handlePreferenceChange = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
    setSnack({ open: true, message: 'Preferência salva!', severity: 'success' });
  };

  const handleLogout = () => {
    setSnack({ open: true, message: 'Desconectando...', severity: 'info' });
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', maxWidth: '100vw', overflowX: 'hidden', bgcolor: colors.neutral[50] }}>
      <Header />

      <ProfileHeroBanner
        name={profileData.name}
        role={roleLabel}
        avatar={profileData.avatar}
        initials={userInitials}
        isMobile={isMobile}
        isEditing={isEditing}
        showSaveButtons={true}
        onAvatarChange={(file) => setIsEditing(true)}
        onAvatarSave={(preview) => {
          setProfileData(p => ({ ...p, avatar: preview }));
          setSnack({ open: true, message: 'Foto de perfil atualizada!', severity: 'success' });
        }}
        onAvatarCancel={() => {
          setSnack({ open: true, message: 'Upload cancelado', severity: 'info' });
        }}
      />

      <Box sx={{
        flex: 1,
        px: { xs: 1.5, sm: 2, md: 3 },
        py: { xs: 2, sm: 3, md: 4 },
        maxWidth: { xs: '100vw', sm: '100%', md: '1280px' },
        mx: 'auto',
        width: '100%',
        overflowX: 'hidden',
      }}>
        <Stack spacing={{ xs: 2.5, sm: 3 }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' },
            gap: { xs: 2, sm: 1.5 },
            width: '100%',
          }}>
            <StatCard icon={User} label="Viagens" value={profileData.trips.toString()} variant="primary" />
            <StatCard icon={User} label="Avaliação" value={profileData.rating.toString()} variant="success" />
            <StatCard icon={User} label="Membro há" value={memberDays.toString()} variant="warning" />
            <StatCard icon={User} label="Status" value={profileData.role === 'OWNER' ? 'Motorista' : profileData.role === 'ADMIN' ? 'Admin' : 'Passageiro'} variant="info" />
          </Box>

          <ProfileEditForm
            profileData={profileData}
            editData={editData}
            onEditDataChange={setEditData}
            onSave={handleSaveProfile}
            onCancel={handleEditToggle}
            isEditing={isEditing}
            onEditToggle={handleEditToggle}
          />

          <SecuritySection onChangePassword={() => setShowPasswordDialog(true)} />
          <PreferencesSection preferences={preferences} onPreferenceChange={handlePreferenceChange} />
          <AccountSection onLogout={handleLogout} />
        </Stack>
      </Box>

      <ChangePasswordDialog
        open={showPasswordDialog}
        onClose={() => {
          setShowPasswordDialog(false);
          setTimeout(() => {
            if (passwordButtonRef.current) passwordButtonRef.current.focus();
          }, 100);
        }}
        passwordData={passwordData}
        onPasswordDataChange={setPasswordData}
        onSubmit={handleChangePassword}
      />

      <RouteSnackBar open={snack.open} message={snack.message} severity={snack.severity} onClose={() => setSnack({ ...snack, open: false })} />
    </Box>
  );
};

export default ProfilePage;
