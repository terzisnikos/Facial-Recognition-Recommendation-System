declare module 'reactstrap' {

  interface AlertProps {
    className?: string
    color?: string
    isOpen?: boolean
    toggle?: Function
    tag?: Function | string
    transitionAppearTimeout?: number
    transitionEnterTimeout?: number
    transitionLeaveTimeout?: number
    [rest: string]: any
  }

  export type TooltipPlacement = 'top' |
    'bottom' |
    'left' |
    'right' |
    'top left' |
    'top center' |
    'top right' |
    'right top' |
    'right middle' |
    'right bottom' |
    'bottom right' |
    'bottom center' |
    'bottom left' |
    'left top' |
    'left middle' |
    'left bottom'

  export class Alert extends React.Component<AlertProps, JSX.Element> {

  }

  export class UncontrolledAlert extends React.Component<AlertProps , JSX.Element> {

  }

  interface BadgeProps {
    pill?: any
    color?: string
    [rest: string]: any
  }

  export class Badge extends React.Component<BadgeProps, JSX.Element> {

  }

  interface BaseCardProps {
    tag?: Function | string
    className?: string
    [rest: string]: any
  }

  interface CardProps extends BaseCardProps {
    inverse?: boolean
    color?: string
    block?: boolean
    [rest: string]: any
  }

  export class Card extends React.Component<CardProps, JSX.Element> {

  }

  export class CardBlock extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardColumns extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardDeck extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardFooter extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardGroup extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardHeader extends React.Component<BaseCardProps, JSX.Element> {

  }

  export interface CardImgProps extends BaseCardProps {
    top?: boolean
    bottom?: boolean
    [rest: string]: any
  }

  export class CardImg extends React.Component<CardImgProps, JSX.Element> {

  }

  export class CardImgOverlay extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardLink extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardSubtitle extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardText extends React.Component<BaseCardProps, JSX.Element> {

  }

  export class CardTitle extends React.Component<BaseCardProps, JSX.Element> {

  }

  type ColumnTypes = string | number | boolean | {
    size?: string
    push?: string | number
    pull?: string | number
    offset?: string | number
    [rest: string]: any
  }

  interface ColProps {
    xs?: ColumnTypes
    sm?: ColumnTypes
    md?: ColumnTypes
    lg?: ColumnTypes
    xl?: ColumnTypes
    widths?: any[]
    [rest: string]: any
  }

  export class Col extends React.Component<ColProps, JSX.Element> {

  }

  interface CollapseProps extends React.HTMLProps<HTMLDivElement> {
    isOpen: boolean
    navbar?: boolean
    delay?: number
    onOpened?: Function
    onClosed?: Function
    [rest: string]: any
  }

  export class Collapse extends React.Component<CollapseProps, JSX.Element> {

  }

  interface ContainerProps {
    fluid?: any
    [rest: string]: any
  }

  export class Container extends React.Component<ContainerProps, JSX.Element> {

  }

  interface DropdownProps {
    disabled?: boolean
    dropup?: boolean
    group?: boolean
    isOpen: boolean
    tag?: string // default: 'div'
    tether?: any
    toggle?: Function
    caret?: any
    [rest: string]: any
  }

  export class Dropdown extends React.Component<DropdownProps, JSX.Element> {

  }

  interface UncontrolledDropdownProps {
    disabled?: boolean
    dropup?: boolean
    group?: boolean
    isOpen?: boolean
    tag?: string // default: 'div'
    tether?: any
    toggle?: Function
    caret?: any
    [rest: string]: any
  }

  export class UncontrolledDropdown extends React.Component<UncontrolledDropdownProps, JSX.Element> {

  }

  interface DropdownToggleProps {
    caret?: boolean
    color?: string
    className?: string
    disabled?: boolean
    onClick?: Function
    'data-toggle'?: string
    'aria-haspopup'?: boolean
    nav?: boolean
    tag?: any
    size?: string
    [rest: string]: any
  }

  export class DropdownToggle extends React.Component<DropdownToggleProps, JSX.Element> {

  }

  interface DropdownMenuProps {
    right?: any
    [rest: string]: any
  }

  export class DropdownMenu extends React.Component<DropdownMenuProps, JSX.Element> {

  }

  interface DropdownItemProps {
    header?: any
    disabled?: any
    divider?: any
    onClick?: Function
    [rest: string]: any
  }

  export class DropdownItem extends React.Component<DropdownItemProps, JSX.Element> {

  }

  interface FormProps {
    inline?: any
    [rest: string]: any
  }

  export class Form extends React.Component<FormProps, JXS.Element> {

  }

  interface FormGroupProps {
    row?: any
    check?: any
    disabled?: any
    color?: string
    tag?: Function | string
    [rest: string]: any
  }

  export class FormGroup extends React.Component<FormGroupProps, JSX.Element> {

  }

  interface LabelProps {
    for?: string
    [rest: string]: any
  }

  export class Label extends React.Component<LabelProps, JSX.Element> {

  }

  interface InputProps extends React.HTMLProps<HTMLInputElement> {
    type?: string
    name?: string
    id?: string
    multiple?: any
    placeholder?: string
    state?: string
    [rest: string]: any
  }

  export class Input extends React.Component<InputProps, JSX.Element> {

  }

  interface InputGroupProps {
    tag?: Function | string
    size?: string
    className?: string
    style?: any
    [rest: string]: any
  }

  export class InputGroup extends React.Component<InputGroupProps, JSX.Element> {

  }

  interface InputGroupTextProps {
    [rest: string]: any
  }

  export class InputGroupText extends React.Component<InputGroupTextProps, JSX.Element> {

  }

  interface InputGroupAddOnProps {
    tag?: Function | string
    className?: string
    [rest: string]: any
  }

  export class InputGroupAddon extends React.Component<InputGroupAddOnProps, JSX.Element> {

  }

  interface InputGroupButtonProps {
    tag?: Function | string
    groupClassName?: string
    groupAttributes?: any
    className?: string
    [rest: string]: any
  }

  export class InputGroupButton extends React.Component<InputGroupButtonProps, JSX.Element> {

  }

  interface FormTextProps {
    color?: string
    [rest: string]: any
  }

  export class FormText extends React.Component<FormTextProps, JSX.Element> {

  }

  interface JumbotronProps {
    tag?: Function | string
    fluid?: boolean
    className?: string
    [rest: string]: any
  }

  export class Jumbotron extends React.Component<JumbotronProps, JSX.Element> {

  }

  export class ListGroup extends React.Component<JSX.Element, JSX.Element> {

  }

  interface ListGroupItemProps {
    color?: string
    disabled?: any
    active?: any
    action?: any
    tag?: Function | string
    to?: string
    href?: string
    [rest: string]: any
  }

  export class ListGroupItem extends React.Component<JSX.Element, JSX.Element> {

  }

  interface MediaProps {
    body?: boolean
    bottom?: boolean
    children?: boolean
    className?: string
    heading?: boolean
    left?: boolean
    list?: boolean
    middle?: boolean
    object?: boolean
    right?: boolean
    tag?: Function | string
    top?: boolean
    href?: string
    to?: string
    placeholder?: any
    image?: any
    [rest: string]: any
  }

  export class Media extends React.Component<MediaProps, JSX.Element> {

  }

  interface ModalProps {
    isOpen:  boolean
    toggle:  Function
    size?: string
    backdrop?: boolean | 'static'
    keyboard?: boolean
    zIndex?: number | string
    [rest: string]: any
  }

  export class Modal extends React.Component<ModalProps, JSX.Element> {

  }

  export class ModalHeader extends React.Component<React.HTMLProps<HTMLDivElement> & {[rest: string]: any}, JSX.Element> {

  }

  export class ModalFooter extends React.Component<React.HTMLProps<HTMLDivElement>, JSX.Element> {

  }

  export class ModalBody extends React.Component<React.HTMLProps<HTMLDivElement>, JSX.Element> {

  }

  interface NavbarProps extends React.HTMLProps<HTMLDivElement> {
    light?: boolean
    inverse?: boolean
    full?: boolean
    fixed?: string
    color?: string
    role?: string
    toggleable?: boolean | string
    tag?: Function | string
    [rest: string]: any
  }

  export class Navbar extends React.Component<NavbarProps, JSX.Element> {

  }

  interface NavbarTogglerProps extends React.HTMLProps<HTMLDivElement> {
    type?: string
    right?: boolean
    left?: boolean
    tag?: Function | string
    [rest: string]: any
  }

  export class NavbarToggler extends React.Component<NavbarTogglerProps, JSX.Element> {

  }

  interface NavbarBrandProps extends React.HTMLProps<HTMLDivElement> {
    tag?: Function | string
    to?: string
    [rest: string]: any
  }

  export class NavbarBrand extends React.Component<NavbarBrandProps, JSX.Element> {

  }

  interface NavProps extends React.HTMLProps<HTMLDivElement> {
    inline?: boolean
    disabled?: boolean
    tabs?: boolean
    pills?: boolean
    stacked?: boolean
    navbar?: boolean
    tag?: Function | string
    [rest: string]: any
  }

  export class Nav extends React.Component<NavProps, JSX.Element> {

  }

  interface NavItemProps extends React.HTMLProps<HTMLDivElement> {
    tag?: Function | string
    to?: string
    [rest: string]: any
  }

  export class NavItem extends React.Component<NavItemProps, JSX.Element> {

  }

  interface NavLinkProps extends React.HTMLProps<HTMLDivElement> {
    disabled?: boolean
    active?: boolean
    tag?: Function | string
    to?: string
    [rest: string]: any
  }

  export class NavLink extends React.Component<NavLinkProps, JSX.Element> {

  }

  interface PaginationProps {
    size?: string
    [rest: string]: any
  }

  export class Pagination extends React.Component<PaginationProps, JSX.Element> {

  }

  interface PaginationItemProps {
    active?: any
    disabled?: any
    [rest: string]: any
  }

  export class PaginationItem {

  }

  interface PaginationLinkProps {
    previous?: any
    next?: any
    href?: string
    tag?: Function | string
    to?: string
    [rest: string]: any
  }

  export class PaginationLink extends React.Component<PaginationLinkProps, JSX.Element> {

  }

  interface PopoverProps extends React.HTMLProps<HTMLDivElement> {
    isOpen?: boolean
    toggle?: Function
    target:  string
    tether?: any
    tetherRef?: Function
    placement?: TooltipPlacement
    [rest: string]: any
  }

  export class Popover extends React.Component<PopoverProps, JSX.Element> {

  }

  interface PopoverTitleProps extends React.HTMLProps<HTMLDivElement> {

  }

  export class PopoverTitle extends React.Component<PopoverTitle, JSX.Element> {

  }

  interface PopoverContentProps extends React.HTMLProps<HTMLDivElement> {

  }

  export class PopoverContent extends React.Component<PopoverContentProps, JSX.Element> {

  }

  interface ProgressProps {
    multi?: boolean
    bar?: boolean
    tag?: string
    value?: string | number
    max?: string | number
    animated?: boolean
    striped?: boolean
    color?: string
    className?: string
    [rest: string]: any
  }

  export class Progress extends React.Component<ProgressProps, JSX.Element> {

  }

  export class Row extends React.Component<JSX.Element & {
    form?: any;
    className?: string;
    children?: Element[];
    key?: any;
    props?: any;
    type?: any;
  }, JSX.Element[] | Element[]> {
    type = null;
    key = null;
    props = null
  }

  interface TableProps {
    tag?: Function | string
    size?: string
    bordered?: boolean
    striped?: boolean
    inverse?: boolean
    hover?: boolean
    reflow?: boolean
    responsive?: boolean
    [rest: string]: any
  }

  export class Table extends React.Component<TableProps, JSX.Element> {

  }

  interface TabContentProps extends React.HTMLProps<HTMLDivElement> {
    activeTab?: number | string
    [rest: string]: any
  }

  export class TabContent extends React.Component<TabContentProps, JSX.Element> {

  }

  interface TabPaneProps extends React.HTMLProps<HTMLDivElement> {
    tabId?: number | string
    [rest: string]: any
  }

  export class TabPane extends React.Component<TabPaneProps, JSX.Element> {

  }

  interface TooltipProps {
    isOpen?: boolean
    toggle?: Function
    target?: string
    tether?: any | boolean
    tetherRef?: Function
    delay?: {show?: number, hide?: number} | number
    autohide?: boolean
    placement?:
      'top' |
      'bottom' |
      'left' |
      'right' |
      'top left' |
      'top center' |
      'top right' |
      'right top' |
      'right middle' |
      'right bottom' |
      'bottom right' |
      'bottom center' |
      'bottom left' |
      'left top' |
      'left middle' |
      'left bottom'
    [rest: string]: any
  }

  export class Tooltip extends React.Component<TooltipProps, JSX.Element> {

  }

  export class UncontrolledTooltip extends React.Component<TooltipProps, JSX.Element> {
    [rest: any]: any;
  }

  export class NavbarText extends React.Component<any, any> {
    [rest: any]: any;
  }

  export class Button extends React.Component<any, any> {
    [rest: any]: any;
  }

  export class ButtonGroup extends React.Component<any, any>{
    [rest: any]: any;
  }

  export class Breadcrumb extends React.Component<any, any> {
    [rest: any]: any;
  }

  export class BreadcrumbItem extends React.Component<any, any> {
    [rest: any]: any;
  }
}
