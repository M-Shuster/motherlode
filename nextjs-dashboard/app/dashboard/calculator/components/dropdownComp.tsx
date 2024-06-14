import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from '@nextui-org/react';

// All of  these needs to be replaced with a lookup from a database based on what skill has been picked.
// Therefore, once a skill has been picked, an event needs to be triggered that then causes this component to render with some values

const DropdownComponent = () => {
  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open task list</Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="new"
          shortcut="⌘N"
          // startContent={<AddNoteIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          shortcut="⌘C"
          // startContent={<CopyDocumentIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          shortcut="⌘⇧E"
          // startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
          // startContent={
          //   <DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />
          // }
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownComponent;
