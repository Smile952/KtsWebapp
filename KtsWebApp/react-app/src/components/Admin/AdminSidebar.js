import { useState } from 'react';

export function AdminSidebar() {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <Button onClick={toggleDrawer(true)}>Filter by</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            
        </Drawer>
    )
}