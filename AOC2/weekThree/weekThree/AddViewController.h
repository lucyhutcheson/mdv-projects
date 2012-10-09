//
//  AddViewController.h
//  weekThree
//
//  Created by Lucy Hutcheson on 10/8/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol AddViewDelegate <NSObject>

@required
-(void)onSave:(NSString*)eventInfo;
@end


@interface AddViewController : UIViewController <UITextViewDelegate>
{
    id<AddViewDelegate> delegate;
    IBOutlet UITextField *eventName;
    IBOutlet UIDatePicker *eventDate;
    NSString *myEvent;
}

@property (strong) id<AddViewDelegate> delegate;

-(IBAction)saveEvent:(id)sender;
-(IBAction)closeKeyboard:(id)sender;

@end
