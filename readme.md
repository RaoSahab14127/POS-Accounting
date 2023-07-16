### Accounts Type

'1', 'Assets'
'2', 'Liability'
'3', 'Revenue'
'4', 'Expense'
'5', 'Owner Equity'

SET SQL_SAFE_UPDATES = 0;
ALTER TABLE invoices
DROP FOREIGN KEY invoices_ibfk_1,
ADD CONSTRAINT invoices_ibfk_1
FOREIGN KEY (supplier_id)
REFERENCES supplier (id)
ON DELETE CASCADE;

# Balance Sheet Demo

1989-12-28
