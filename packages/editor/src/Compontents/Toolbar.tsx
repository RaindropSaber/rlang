import React from 'react';
import { message } from 'antd';
import { Menu, Toolbar } from '@antv/x6-react-components';
import '@antv/x6-react-components/es/menu/style/index.css';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import 'antd/dist/antd.css';
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
import { GraphModelContext } from '../Model/index';
import { observer } from 'mobx-react';

const Item = Toolbar.Item; // eslint-disable-line
const Group = Toolbar.Group; // eslint-disable-line

@observer
export default class RToolbar extends React.Component {
  static contextType = GraphModelContext;

  onClick = (name: string) => {
    switch (name) {
      case 'Stencil':
        this.context.changeStencilActivation();
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
    const MenuItem = Menu.Item; // eslint-disable-line
    const Divider = Menu.Divider; // eslint-disable-line

    return (
      <Menu>
        <MenuItem
          name='resetView'
          hotkey='Cmd+H'
        >
          Reset View
        </MenuItem>
        <MenuItem
          name='fitWindow'
          hotkey='Cmd+Shift+H'
        >
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
        <Toolbar
          size='big'
          onClick={this.onClick}
          extra={<span>Extra Component</span>}
        >
          <Group>
            <Item
              name='Stencil'
              tooltip='Zoom Out (Cmd -)'
              active={this.context.stencilActivation}
              icon={<ZoomOutOutlined />}
            />
          </Group>
          <Group>
            <Item
              name='zoomIn'
              tooltip='Zoom In (Cmd +)'
              icon={<ZoomInOutlined />}
            />
            <Item
              name='zoomOut'
              tooltip='Zoom Out (Cmd -)'
              icon={<ZoomOutOutlined />}
            />
          </Group>
          <Group>
            <Item
              name='undo'
              tooltip='Undo (Cmd + Z)'
              icon={<UndoOutlined />}
            />
            <Item
              name='redo'
              tooltip='Redo (Cmd + Shift + Z)'
              icon={<RedoOutlined />}
            />
          </Group>
          <Group>
            <Item
              name='delete'
              icon={<DeleteOutlined />}
              disabled={true}
              tooltip='Delete (Delete)'
            />
          </Group>
          <Group>
            <Item
              name='bold'
              icon={<BoldOutlined />}
              active={true}
              tooltip='Bold (Cmd + B)'
            />
            <Item
              name='italic'
              icon={<ItalicOutlined />}
              tooltip='Italic (Cmd + I)'
            />
            <Item
              name='strikethrough'
              icon={<StrikethroughOutlined />}
              tooltip='Strikethrough (Cmd + Shift + x)'
            />
            <Item
              name='underline'
              icon={<UnderlineOutlined />}
              tooltip='Underline (Cmd + U)'
            />
          </Group>
        </Toolbar>
      </div>
    );
  }
}
