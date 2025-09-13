// type Event struct {
// 	ID              	uint      	`gorm:"primaryKey;autoIncrement" json:"id"`
// 	EventName       	string    	`json:"event_name"`
// 	EventDescription 	string    	`json:"event_description"`
// 	StartAt         	string    	`json:"start_at"`
// 	EndAt           	string    	`json:"end_at"`
// 	MainImageUrl    	string    	`json:"main_image_url"`
// 	RegisterStartDt 	string    	`json:"register_start_dt"`
// 	RegisterCloseDt 	string    	`json:"register_close_dt"`
// 	CreatedAt      		time.Time	`gorm:"autoCreateTime" json:"created_at"`
// 	UpdatedAt      		time.Time	`gorm:"autoUpdateTime" json:"updated_at"`

// 	Tags []Tag `gorm:"many2many:event_tags;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"tags,omitempty"`
// }

export interface Event {
  id?: number; //
  eventName?: string;
  eventDescription?: string;
  startAt?: string; // ISO date string
  endAt?: string; // ISO date string
  mainImageUrl?: string;
  registerStartDt?: string; // ISO date string
  registerCloseDt?: string; // ISO date string
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  // tags?: Tag[]; // Optional array of Tag objects
}
