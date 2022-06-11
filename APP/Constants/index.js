const CONSTANTS = {
  ONE_SIGNAL_APP_ID: 'e62eb896-543c-4aee-838f-31db6f53a214',
  DEPOSIT_INTO_WALLET_UPI: 'Deposit into wallet - UPI- screenshot approval',
  DEPOSIT_INTO_SITE_UPI_CREATE_ID: 'Deposit into site form UPI- for create id',
  DEPOSIT_INTO_SITE_WALLET_CREATE_ID:
    'Deposit into site form wallet- for create id',
  DEPOSIT_INTO_EXISTING_ID_FROM_WALLET: 'Deposit into existing ID- from wallet',
  DEPOSIT_INTO_EXISTING_ID_FROM_UPI:
    'Deposit into site from UPI- for exsiting id',
  WITHDRAW_FROM_EXISTING_ID_TO_WALLET: 'Withdraw from exsiting ID to wallet',
  WITHDRAW_FROM_EXISTING_ID_TO_BANK: 'Withdraw from exsiting ID to Bank',
  WITHDRAW_FROM_WALLET_TO_BANK: 'Withdraw from wallet to bank',
};

const USER_FRIENDLY_PAYMENT_MESSAGE = {
  [CONSTANTS.DEPOSIT_INTO_WALLET_UPI]: {
    Accepted:
      'Yay!! Congratulations!! You have deposited into your wallet from UPI. Enjoy with FG Punt 😍',
    Rejected: 'Nay!! Your deposit request into wallet from UPI is Rejected 😥',
    Pending: 'Wait!! Your deposit request into wallet from UPI is Pending 😞',
  },
  [CONSTANTS.DEPOSIT_INTO_SITE_UPI_CREATE_ID]: {
    Accepted:
      'Yay!! Congratulations!! Your new SITE ID is Available now, Login from MY IDs Screen Enjoy with FG Punt 😍',
    Rejected: 'Nay!! your new SITE ID request has been rejected 😥',
    Pending: 'Wait!! Your new SITE ID request is Pending 😞',
  },
  [CONSTANTS.DEPOSIT_INTO_SITE_WALLET_CREATE_ID]: {
    Accepted:
      'Yay!! Congratulations!! Your new SITE ID is Available now, Login from MY IDs Screen Enjoy with FG Punt 😍',
    Rejected: 'Nay!! your new SITE ID request has been rejected 😥',
    Pending: 'Wait!! Your new SITE ID request is Pending 😞',
  },
  [CONSTANTS.DEPOSIT_INTO_EXISTING_ID_FROM_WALLET]: {
    Accepted:
      'Yay!! Congratulations!! Your deposit into ID from wallet has been approved Enjoy with FG Punt 😍',
    Rejected: 'Nay!! Your deposit into ID from wallet has been rejected 😥',
    Pending: 'Wait!! Your deposit into ID from wallet is Pending 😞',
  },
  [CONSTANTS.DEPOSIT_INTO_EXISTING_ID_FROM_UPI]: {
    Accepted:
      'Yay!! Congratulations!! Your deposit into ID from UPI has been approved Enjoy with FG Punt 😍',
    Rejected: 'Nay!! Your deposit into ID from UPI has been rejected 😥',
    Pending: 'Wait!! Your deposit into ID from UPI is Pending 😞',
  },
  [CONSTANTS.WITHDRAW_FROM_EXISTING_ID_TO_WALLET]: {
    Accepted:
      'Yay!! Congratulations!! Your withdraw from ID to wallet has been approved. Please check wallet balance.' +
      'Enjoy with FG Punt 😍',
    Rejected: 'Nay!! Your withdraw from ID to wallet has been rejected 😥',
    Pending: 'Wait!! Your withdraw from ID to wallet is Pending 😞',
  },
  [CONSTANTS.WITHDRAW_FROM_EXISTING_ID_TO_BANK]: {
    Accepted:
      'Yay!! Congratulations!! Your withdraw from ID to bank has been approved. Please check bank balance Enjoy with FG Punt 😍',
    Rejected: 'Nay!! Your withdraw from ID to bank has been rejected 😥',
    Pending: 'Wait!! Your withdraw from ID to bank is Pending 😞',
  },
  [CONSTANTS.WITHDRAW_FROM_WALLET_TO_BANK]: {
    Accepted:
      'Yay!! Congratulations!! Your withdraw from wallet to bank has been approved. Please check bank balance Enjoy with FG Punt 😍',
    Rejected: 'Nay!! Your withdraw from wallet to bank has been rejected 😥',
    Pending: 'Wait!! Your withdraw from wallet to bank is Pending 😞',
  },
};

export const userFriendlyPaymentMessage = (remarks, status) => {
  return USER_FRIENDLY_PAYMENT_MESSAGE[remarks][status];
};

export default CONSTANTS;
