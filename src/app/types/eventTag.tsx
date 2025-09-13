// type EventTag struct {
// 	EventID     uint   		`gorm:"primaryKey" json:"event_id"`
// 	TagID       uint   		`gorm:"primaryKey" json:"tag_id"`
// 	CreatedAt   time.Time	`gorm:"autoCreateTime" json:"created_at"`
// 	UpdatedAt   time.Time	`gorm:"autoUpdateTime" json:"updated_at"`

// 	// Foreign key relationships
// 	Event Event `gorm:"foreignKey:EventID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"event"`
// 	Tag   Tag   `gorm:"foreignKey:TagID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"tag"`
// }

export interface EventTag {
  eventId: number; // Foreign key to Event
  tagId: number; // Foreign key to Tag
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}
