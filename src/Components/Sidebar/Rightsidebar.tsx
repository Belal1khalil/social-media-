'use client';

import {
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  Paper,
} from '@mui/material';

const onlineFriends = [
  { name: 'Ahmed Elgarba', avatar: '/user1.jpg' },
  { name: 'Amar elmihy', avatar: '/user2.jpg' },
  { name: 'Ehab elgarba', avatar: '/user3.jpg' },
  { name: 'Ahmed tarek', avatar: '/user4.jpg' },
];

export default function Rightsidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) return null; // Hide on mobile

  return (
    <Box
      sx={{
        width: 320,
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderLeft: '1px solid #eee',
        bgcolor: 'background.default',
        px: 2,
        py: 3,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: '4px',
        },
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">
        Online Friends
      </Typography>

      <Stack spacing={2}>
        {onlineFriends.map((user, index) => (
          <Tooltip title="Message" arrow key={index}>
            <Paper
              elevation={1}
              sx={{
                p: 1.2,
                px: 2,
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                transition: '0.3s',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'scale(1.01)',
                },
              }}
            >
              <Box position="relative">
                <Avatar src={user.avatar} alt={user.name} />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 12,
                    height: 12,
                    bgcolor: '#4caf50',
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                />
              </Box>
              <Box>
                <Typography fontWeight={500}>{user.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Active now
                </Typography>
              </Box>
            </Paper>
          </Tooltip>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" fontWeight={700} mb={1} color="text.primary">
        Events
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <Typography color="text.secondary" fontSize="14px">
          🎉 No upcoming events today.
        </Typography>
        <Typography variant="body2" mt={1} color="primary" fontWeight={500}>
          View Calendar
        </Typography>
      </Paper>
    </Box>
  );
}
