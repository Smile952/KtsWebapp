import { CircularProgress } from "@mui/material";

export function LoadingSpinner(){
    return(
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </div>
    );
}