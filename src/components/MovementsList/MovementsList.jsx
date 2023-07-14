import { useDatabase } from '@/hooks/useDatabase.jsx';
import { MovementItem } from '@/components/MovementItem/MovementItem.jsx';
export const MovementsList = () => {
    const {
        userData: { movements },
    } = useDatabase();

    return <>{movements?.map((movement, index) => <MovementItem movement={movement} index={index} key={index} />).reverse()}</>;
};
