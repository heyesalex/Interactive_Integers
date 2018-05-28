# Interactive-Integers
This is an interactive model of integers as red and blue counters, using the p5 javascript library. 

This is designed to help students explore properties of adding and subtracting integers, using a visual model. Red counters represent positive numbers, while blue counters represent negative numbers (think hot and cold).

Each arrangement of red and blue counters in itself represents an integer, using the idea of a "total score". So 3R and 2B means your total score is 3, take away 2, giving 1 positive point. If instead you have 2B, your score is simply negative 2. 

The first thing you can do with counters is cancel them out. Holding one blue counter over one red counter casuses them both the highlight with and orange stroke. Release the mouse, and they fade away. The important thing to note is that this does not change the total displayed "score", because the score already takes into account cancelling. 

Once students are familiar with the idea of cancelling to find the integer result, you can introduce adding and subtracting counters. Adding a blue counter from the "bank" lowers the score, as it cancels out one red counter. 

To subtract counters, drag them from the table to the bank stacks, where they highlight Blue for Subtraction. Dropping them removes the counter. Removing red counters decreases the score, while removing blue counters increases the score (one less "take away" counter).

#Settings

There are 7 settings, that can be changed using hashes in the url. To change a setting, typ # at the end of the url, then input settings as numbers, using the underscore symbol _ to separate them.

Setting 1: Initial number of Red counters. This setting must be a non-negative integer. If no input is given, or a symbol that isn't a non-negative integer, then there will initially be a random number of red counters (between 1 and 5). 

Setting 2: Initial number of Blue counters. This setting must be a non-negative integer. If no input is given, or a symbol that isn't a non-negative integer, then there will initially be a random number of blue counters (between 1 and 5). 

Setting 3: Adding Red counters. This is a Boolean input that controls whether the user can add counters by dragging them from the stack. Inputting 0 means no addition is allowed, and inputting 1 means addition is allowed. By default, this is set to 1, so students can add. 

Setting 4: Subtracting Red counters. This is a Boolean input that controls whether the user can subtract counters by dragging them to the stack. Inputting 0 means no subtraction is allowed, and inputting 1 means subtraction is allowed. By default, this is set to 1, so students can subtract.

Setting 5: Adding Blue counters. This is a Boolean input that controls whether the user can add blue counters by dragging them from the stack. Inputting 0 means no addition is allowed, and inputting 1 means addition is allowed. By default, this is set to 1, so students can add.

Setting 6: Subtracting Blue counters. This is a Boolean input that controls whether the user can subtract blue counters by dragging them to the stack. Inputting 0 means no subtraction is allowed, and inputting 1 means subtraction is allowed. By default, this is set to 1, so students can subtract.

Setting 7: Displayed equation. This is a Boolean input that controls whether the equation underneath the canvas is displayed. Inputting 0 means no display, and inputting 1 means the equation is displayed. By default, this is set to 1, so the equation is displayed.
