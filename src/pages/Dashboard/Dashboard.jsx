import { useDatabase } from '@/hooks/useDatabase.jsx';
import styles from '@/pages/Dashboard/Dashboard.module.scss';
import { MdOutlineWavingHand } from 'react-icons/md';
import { TransferMoney } from '@/components/TransferMoney/TransferMoney.jsx';
import { MovementsList } from '@/components/MovementsList/MovementsList.jsx';
import { RequestLoan } from '@/components/RequestLoan/RequestLoan.jsx';
import { WipeAccount } from '@/components/WipeAccount/WipeAccount.jsx';

export const Dashboard = () => {
    const { userData, userBalance } = useDatabase();

    const userFirstName = userData?.name?.split(' ').at(0);

    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    };
    const locale = navigator.language;
    const dateString = new Intl.DateTimeFormat(locale, options).format(now);

    return (
        <section>
            <h2 className={styles.dashboard__firstName}>
                Good Day, {userFirstName}! <MdOutlineWavingHand />
            </h2>
            <div className={styles.dashboard__balanceBox}>
                <div>
                    <p className={styles.dashboard__balanceLabel}>Current balance</p>
                    <p className={styles.dashboard__balanceDate}>As of {dateString}</p>
                </div>
                <p className={styles.dashboard__balanceValue}>{userBalance} €</p>
            </div>
            <div className={styles.dashboard__wrapper}>
                <div className={styles.dashboard__movementsBox}>
                    <MovementsList />
                </div>
                <TransferMoney />
                <RequestLoan />
                <WipeAccount />
            </div>
        </section>
    );
};
