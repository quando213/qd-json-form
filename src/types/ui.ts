export type TabItem = {
  name: string;
  key: string;
};

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
}
