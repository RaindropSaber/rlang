import React from 'react';
import { message } from 'antd';
import { Menu, Toolbar } from '@antv/x6-react-components';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
  UndoOutlined,
  DeleteOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
} from '@ant-design/icons';
import EditorContext from '../Store/Context';
import { observer } from 'mobx-react';

const Item = Toolbar.Item;
const Group = Toolbar.Group;

@observer
export default class RToolbar extends React.Component {
  declare context: React.ContextType<typeof EditorContext>;
  static contextType = EditorContext;

  onClick = (name: string) => {
    switch (name) {
      case 'Stencil':
        this.context.state.setStencilStatus();
        return;

      default:
        message.success(`${name} clicked`, 10);
        break;
    }
  };

  onItemClick = () => {
    this.onClick('undo');
  };

  renderZoomDropdown() {
    const MenuItem = Menu.Item;
    const Divider = Menu.Divider;

    return (
      <Menu>
        <MenuItem name='resetView' hotkey='Cmd+H'>
          Reset View
        </MenuItem>
        <MenuItem name='fitWindow' hotkey='Cmd+Shift+H'>
          Fit Window
        </MenuItem>
        <Divider />
        <MenuItem name='25'>25%</MenuItem>
        <MenuItem name='50'>50%</MenuItem>
        <MenuItem name='75'>75%</MenuItem>
        <MenuItem name='100'>100%</MenuItem>
        <MenuItem name='125'>125%</MenuItem>
        <MenuItem name='150'>150%</MenuItem>
        <MenuItem name='200'>200%</MenuItem>
        <MenuItem name='300'>300%</MenuItem>
        <MenuItem name='400'>400%</MenuItem>
      </Menu>
    );
  }

  render() {
    return (
      <div style={{ background: '#f5f5f5', paddingRight: 16 }}>
        {/* @ts-ignore */}
        <Toolbar size='big' onClick={this.onClick} extra={<span>Extra Component</span>}>
          <Group>
            {/* @ts-ignore */}
            <Item
              name='Stencil'
              tooltip='Zoom Out (Cmd -)'
              active={this.context.state.isStencilEnabled.get()}
              icon={<ZoomOutOutlined />}
            />
          </Group>
          <Group>
            <Item name='zoomIn' tooltip='Zoom In (Cmd +)' icon={<ZoomInOutlined />} />
            <Item name='zoomOut' tooltip='Zoom Out (Cmd -)' icon={<ZoomOutOutlined />} />
          </Group>
          <Group>
            <Item name='undo' tooltip='Undo (Cmd + Z)' icon={<UndoOutlined />} />
            <Item name='redo' tooltip='Redo (Cmd + Shift + Z)' icon={<RedoOutlined />} />
          </Group>
          <Group>
            <Item name='delete' icon={<DeleteOutlined />} disabled={true} tooltip='Delete (Delete)' />
          </Group>
          <Group>
            <Item name='bold' icon={<BoldOutlined />} active={true} tooltip='Bold (Cmd + B)' />
            <Item name='italic' icon={<ItalicOutlined />} tooltip='Italic (Cmd + I)' />
            <Item name='strikethrough' icon={<StrikethroughOutlined />} tooltip='Strikethrough (Cmd + Shift + x)' />
            <Item name='underline' icon={<UnderlineOutlined />} tooltip='Underline (Cmd + U)' />
          </Group>
        </Toolbar>
      </div>
    );
  }
}
