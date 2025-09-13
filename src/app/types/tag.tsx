// type Tag struct {
// 	ID          uint      	`gorm:"primaryKey;autoIncrement" json:"id"`
// 	TagName     string    	`json:"tag_name"`
// 	CreatedAt   time.Time	`gorm:"autoCreateTime" json:"created_at"`
// 	UpdatedAt   time.Time	`gorm:"autoUpdateTime" json:"updated_at"`

// 	Events []Event `gorm:"many2many:event_tags;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"events,omitempty"`
// }

export interface Tag {
  id?: number;
  tagName?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}
