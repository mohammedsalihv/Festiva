// components/SwitchTabs.tsx
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

type TabOption = {
  label: string;
  value: string;
};

type SwitchTabsProps = {
  options: TabOption[];
  value: string;
  onChange: (newValue: string) => void;
};

export default function SwitchTabs({ options, value, onChange }: SwitchTabsProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: 'black' } }}
        aria-label="switch tabs"
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 48,
        }}
      >
        {options.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            sx={{
              flexShrink: 0,
              fontSize: { xs: '0.85rem', sm: '1rem' },
              minWidth: { xs: 100, sm: 120 },
              px: { xs: 1.5, sm: 2 },
              minHeight: 48,
              color: value === tab.value ? 'black' : 'gray',
              fontWeight: value === tab.value ? 'bold' : 'normal',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
